/**
 * -------------------------------
 * CONSTANTS
 * 
 * Ideally, these would be dynamic
 * but haven't yet figured our how
 * to get the info outside of our
 * analyser scope...
 * -------------------------------
 */
var SAMPLE_RATE = 44100;
// var SAMPLE_RATE = context.sampleRate;
var FFT_SIZE = 1024;
var BIN_SIZE = FFT_SIZE / 2;
var BOTTOM_THRESHOLD = 20;
var TOP_THRESHOLD = 20000;

/**
 * ---------------
 * AUDIO ANALYSIS
 *
 * This function
 * hooks into the
 * output of the
 * synth, and gets
 * data about the
 * audio.
 * ---------------
 */

// context = current audio API context
// master = master audio output
function audioAnalysis(context,master){
    
    // Setup an analyser node
    var volumeAnalyser = context.createAnalyser();
    // Set our FFT (Fast Fourier Transform) size
    var fftSize = FFT_SIZE;
    volumeAnalyser.fftSize = fftSize;
    // Get our sample rate (usually 44.1kHz, but we want to be certain as some systems are different)
    var sampleRate = context.sampleRate;// returns in Hz (not kHz).
    // Do we want our analyser to smooth the transitions for us?
    // If we do: set a time value. Otherwise set "0" to have no smoothing.
    volumeAnalyser.smoothingTimeConstant = 0;
    // The buffer size is the number of "bins" of data
    // we get (e.g. the number of items in our array).
    // This will be half the FFT size.
    var bufferSize = volumeAnalyser.frequencyBinCount;
    // Connect the volumeAnalyser to our master audio output
    master.connect(volumeAnalyser);

    // Create a Node to listen to the output every
    // 2048 'frames' (a.k.a. 21 times a
    // second at sample-rate of 44.1kHz)
    listenerNode = context.createScriptProcessor(2048,1,1);

    // Connect it to our audio:
    listenerNode.connect(master);

    listenerNode.onaudioprocess = function(){

        // Create an array to store our data
        var array = new Uint8Array(bufferSize);
        // Get the audio data and store it in our array
        volumeAnalyser.getByteFrequencyData(array);
        // If we wanted information about the waveform
        // rather than the frequency, we would use this:
        // volumeAnalyser.getByteTimeDomainData(array);
        
        // Trim data to audible frequencies
        array = trimFrequencies(array,sampleRate,fftSize);

        // Calculate the mean value of the frequency frame
        var volume = getAverageVolume(array);

        // logArray(array);

        var parsedArray = array;//parseFreqArray(array);

        // Update the volume display
        // console.log(volume);
        // redrawVolume(volume);
        // redrawFrequency(parsedArray);

    }
}

/**
 * -----------------------
 * TRIM OUR FREQUENCY DATA
 *
 * We only want to display
 * data for frequencies we
 * can hear (20Hz – 20kHz)
 * so trim any data above
 * and below the threshold
 * -----------------------
 */
function trimFrequencies(bins,sampleRate,fftSize){
    var bottomThreshold = BOTTOM_THRESHOLD;// 20Hz
    var topThreshold = TOP_THRESHOLD;// 20kHz

    var result = [];

    for (var i = 1; i <= bins.length; i++) {
        // console.log(i);
        // Calculate the frequency for each "bin".
        var frequency = i * sampleRate/fftSize;
        if (frequency > bottomThreshold && frequency < topThreshold) {
            var output = [];
            output['frequency'] = frequency;
            output['value'] = bins[i-1];// Strength of signal at selected frequency
            result.push(output);
        }
    }

    // var start = [];
    // start['frequency'] = 0;
    // start['value'] = 0;
    // result.unshift(start);

    return result;
}

/**
 * --------------------
 * AVERAGE VOLUME
 *
 * Convert all the
 * frequency amplitudes
 * (for a given frame)
 * into a single number
 * --------------------
 */
function getAverageVolume(array){
    var values = 0;
    var count = 0;
    var average = 0;
    var length = array.length;

    // Sum all the frequency values
    for (var i = 0; i < length; i++) {
        if (array[i]['value'] > 0) {
            values += array[i]['value'];
            count++;
        }
    }

    // Get the mean value
    if (values > 0 && count > 0) {
        average = values / count;
    } else {
        average = 0;
    }

    // Limit to 2 decimal places
    average = average.toFixed(2);
    
    // Remove any negative numbers
    if (average < 0) {
        average = 0;
    }

    // Flatten peaks
    if (average > 150) {
        average = 150;
    }

    return average;
}

/**
 * -----------------------
 * PARSE FREQUENCY ARRAY
 * 
 * Sanitize the frequency
 * data to suppress errors
 * and zoom-in on relevant
 * part of audio spectrum.
 * -----------------------
 */
function parseFreqArray(array){
    var result = [];

    // logArray(array);

    // Return only the first X number of array items
    for (var i = 0; i < 100; i++) {
        result.push(array[i]['value']);
    }

    logArray(result);

    return result;
}

/**
 * ------------------
 * LOG ARRAY
 * 
 * Only log if array
 * contains values
 * greater than zero.
 * ------------------
 */
function logArray(array){
    var logArray = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i]['value'] > 0) {
            logArray = true;
        }
    }
    if (logArray) {
        console.log(array[0]);
    }
}