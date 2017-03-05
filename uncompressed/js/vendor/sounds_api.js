/**
 * ------------------------------------------------
 * SOUNDS A.P.I.
 *
 * Call this function to invoke a new instance of a
 * synth. Simplified example:
 *     
 * var new_synth = Sounds_API(window.AudioContext);
 *
 * This function creates a simplified API that will
 * generate synthesier-sounds. To be of any use, it
 * requires some sort of input handling.
 *
 * This synth is mono-phonic. It creates one single
 * oscillator which it leaves running continously.
 * Whether we hear it or not is set by a volume
 * control for the oscillator. When we change note,
 * we're altering the pitch of our main oscillator.
 * If we wanted a polyphonic synth, we would need
 * to initialise an oscillator for each individual
 * note.
 *
 * We are using a second oscillator to add an extra
 * texture to the notes we make. This runs in
 * tandem with the first oscillator, and is
 * controlled by the same volume setting.
 *
 * PUBLIC METHODS
 * 
 * 1. handleWaveType( wave_int ):
 * Takes an integer and converts it to a string for
 * a wave-type.
 * 0 = sine, 1 = square, 2 = sawtooth, 3 = triangle
 * 
 * 2. controlChanged( option_string, value ):
 * Sets a new value for an option.
 * masterVolume, oscOneVolume, oscTwoVolume,
 * oscOneWave, oscTwoWave, oscTwoPitch
 * 
 * 3. noteStart( pitch ):
 * Starts a note with a given pitch.
 * 
 * 4. noteEnd:
 * Ends the audible note.
 * ------------------------------------------------
 */
var Sounds_API = (function sounds_API(){

    var contextClass = (window.AudioContext || window.webkitAudioContext);

    var // Set up audio context (set as a param so
        // we can use the browser-specific version)
        context = new contextClass();

    var // Controller Values
        masterVolume = 0.5,
        currentPitch = null,
        currentNote = null;

    var // Controller Starting Values
        vco2PM = 2, // (PM = Pitch Multiplier)
        vco1wav = 'sine',
        vco2wav = 'triangle';

    /**
     * -----------------------------------
     * SETTING UP AUDIO
     *
     * We need oscillators to create our
     * waveforms, and amplifiers to then
     * manipulate them.
     * 
     * VCO = voltage controlled oscillator
     * VCA = voltage controlled amplifier
     *
     * VCO & VCA are terms taken from
     * analogue synth construction (they
     * used real circuits and voltages)
     * -----------------------------------
     */
    
    // VCO #1
    // Create an oscillator using the API:
    var vco1 = context.createOscillator();
    // Set the waveform for our new VCO:
    vco1.type = vco1wav;// OPTIONS: sine, square, sawtooth, triangle
    // Set the starting frequency for the VCO
    vco1.frequency.value = 440.00;// 440.00Hz = "A", the standard note all orchestras tune to.
    // Get the VCO running
    vco1.start(0);

    // VCO #2
    // Repeat the process for our second oscillator:
    var vco2 = context.createOscillator();
    vco2.type = vco2wav;
    vco2.frequency.value = 440.00;
    vco2.start(0);

    // VCA
    // This is a gain (volume) node that
    // will control the volume of the note.
    var vca = context.createGain();
    vca.gain.value = 0;

    // VCO#1 VOLUME
    // Gain node for VCO#1
    var vco1vol = context.createGain();
    vco1vol.gain.value = 1;

    // VCO#2 VOLUME
    // Gain node for VCO#2
    var vco2vol = context.createGain();
    vco2vol.gain.value = 0.6;

    // MASTER VCA
    // This is our overall volume control
    // When we trigger a note, the normal
    // VCA goes from 0 to full. Having a
    // master volume control allows us to
    // set the global volume without
    // affecting the notes' on/off function.
    var master = context.createGain();
    master.gain.value = 0.1;

    // CONNECTIONS
    // Here we link all our nodes
    // together. The final setting
    // of `context.destination`
    // pipes the resulting sounds
    // to our audio output, so we
    // can hear it.
    vco1.connect(vco1vol);
    vco1vol.connect(vca);
    vco2.connect(vco2vol);
    vco2vol.connect(vca);
    vca.connect(master);
    master.connect(context.destination);

    /**
     * -------------------------------------
     * NOTE CONTROLS
     *
     * These methods begin and end our note.
     * 
     * `noteStart()` is passed a frequency,
     * sets that frequency to the VCOs and
     * then makes sure the VCA is set to 1
     * (a.k.a. full volume). Then it adds a
     * class to the relevant note on the
     * keyboard so we can visually show that
     * the note has been pressed.
     * 
     * `noteEnd()` reverses this process.
     * -------------------------------------
     */
    function noteStart(note){
        vco1.frequency.value = note;// Set note pitch
        vco2.frequency.value = (note / vco2PM);// Set note pitch
        vca.gain.value = 1;// Start note
    }
    function noteEnd(){
        vca.gain.value = 0;// End note
    }

    /**
     * ------------------------
     * OSCILLATOR CONTROLS
     *
     * We can use these methods
     * to alter various aspects
     * of the oscillators.
     * ------------------------
     */
    
    function masterVolumeControl(volume){
        master.gain.value = volume;
    }
    
    function oscOneVolumeControl(osc1volume){
        vco1vol.gain.value = osc1volume;
    }
    
    function oscTwoVolumeControl(osc2volume){
        vco2vol.gain.value = osc2volume;
    }
    
    function oscOneWaveControl(oscOneWaveType){
        vco1wav = _handleWaveType(oscOneWaveType);
        vco1.type = vco1wav;
    }
    
    function oscTwoWaveControl(oscTwoWaveType){
        vco2wav = _handleWaveType(oscTwoWaveType);
        vco2.type = vco2wav;
    }
    
    function oscTwoPitchControl(pitchMultiplier){
        vco2PM = pitchMultiplier;
    }

    /**
     * -------------------
     * CONTROL ROUTER
     *
     * Handles incoming
     * control changes and
     * directs them to the
     * correct controller.
     * -------------------
     */
    function _controlRouter(name,value){
        // console.log('the ' + name + ' control has been set to ' + value);
        switch (name) {
            case 'masterVolume':
                masterVolumeControl(value);
                break;
            case 'oscOneVolume':
                oscOneVolumeControl(value);
                break;
            case 'oscTwoVolume':
                oscTwoVolumeControl(value);
                break;
            case 'oscOneWave':
                oscOneWaveControl(value);
                break;
            case 'oscTwoWave':
                oscTwoWaveControl(value);
                break;
            case 'oscTwoPitch':
                oscTwoPitchControl(value);
                break;
        }

    }

    /**
     * ----------------------------
     * HANDLE WAVE TYPES
     * 
     * This helper-function takes a
     * raw value from a range input
     * and converts it into the
     * correct string value for the
     * oscillator type.
     * ----------------------------
     */
    function _handleWaveType(rawWaveValue){
        switch (rawWaveValue) {
            case 0:
            case '0':
            case 'sine':
                stringWaveValue = 'sine';
                break;
            case 1:
            case '1':
            case 'square':
                stringWaveValue = 'square';
                break;
            case 2:
            case '2':
            case 'sawtooth':
                stringWaveValue = 'sawtooth';
                break;
            case 3:
            case '3':
            case 'triangle':
                stringWaveValue = 'triangle';
                break;
            default:
                stringWaveValue = 'sine';
        }
        return stringWaveValue;
    }

    /**
     * ---------------
     * AUDIO ANALYSIS
     *
     * Send our audio
     * output and the
     * context to our
     * analysis tools. 
     * ---------------
     */
    // audioAnalysis(context,master);


    /**
     * ------------------------------
     * Public API
     *
     * These are the methods that we
     * want to expose publicly.
     * MegaSuperSynthInputs taps into
     * these to control the synth.
     * ------------------------------
     */
    var publicAPI = {
        handleWaveType: _handleWaveType,
        controlChanged: _controlRouter,
        noteStart: noteStart,
        noteEnd: noteEnd
    };
    
    return publicAPI;

})();