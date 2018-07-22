/**
 * ---------------------------------------------------------------------------
 * SOUNDS A.P.I.
 *
 * Call this function to invoke a new instance of a synth. Simplified example:
 *
 * var new_synth = SoundsAPI(window.AudioContext);
 *
 * This function creates a simplified API that generates synthesier-sounds. To
 * be of any use, it requires some sort of input handling.
 *
 * This synth is mono-phonic. It creates one single oscillator which it leaves
 * running continously. Audible output is set by a volume control for the main
 * oscillator. When we change note, we're altering the pitch of our oscillator
 * (so if we wanted a polyphonic synth, we would need to run an oscillator for
 * each individual note).
 *
 * We are using a second oscillator to add an extra texture to the notes. This
 * runs in tandem with the first oscillator & is slaved to the volume level of
 * the primary oscillator.
 * ---------------------------------------------------------------------------
 */
function SoundsAPI(options) {
    /**
     * -----------------------
     * PARSE OPTIONS
     *
     * Make sure we have valid
     * options. If we don't we
     * should provide sensible
     * fallbacks.
     * -----------------------
     */
    options = typeof options !== 'undefined' ? options : {};
    options.master_volume = options.master_volume || 0.5;
    options.vco2_pitch_mulitplier = options.vco2_pitch_mulitplier || 2;
    options.vco1_wave = options.vco1_wave || 'sine';
    options.vco2_wave = options.vco2_wave || 'triangle';

    var context_class = window.AudioContext || window.webkitAudioContext;

    var // Set up audio context (set as a param so
    // we can use the browser-specific version)
    context = new context_class();

    var // Controller Values
    master_volume = options.master_volume;

    var // Controller Starting Values
        vco2_pitch_mulitplier = options.vco2_pitch_mulitplier, // (PM = Pitch Multiplier)
        vco1_wave = options.vco1_wave,
        vco2_wave = options.vco2_wave;

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
    vco1.type = vco1_wave; // OPTIONS: sine, square, sawtooth, triangle
    // Set the starting frequency for the VCO
    vco1.frequency.value = 440.0; // 440.00Hz = "A", the standard note all orchestras tune to.
    // Get the VCO running
    vco1.start(0);

    // VCO #2
    // Repeat the process for our second oscillator:
    var vco2 = context.createOscillator();
    vco2.type = vco2_wave;
    vco2.frequency.value = 440.0;
    vco2.start(0);

    // VCA
    // This is a gain (volume) node that
    // will control the volume of the note.
    var vca = context.createGain();
    vca.gain.value = 0;

    // VCO#1 VOLUME
    // Gain node for VCO#1
    var vco1_volume = context.createGain();
    vco1_volume.gain.value = 1;

    // VCO#2 VOLUME
    // Gain node for VCO#2
    var vco2_volume = context.createGain();
    vco2_volume.gain.value = 1;

    // PRE-AUX VCA & MASTER VCA
    // When we trigger a note, the normal
    // VCA goes from 0 to full. Having a
    // master volume control allows us to
    // set the global volume without
    // affecting the notes' on/off function.
    //
    // Pre-Aux gives us some gain control
    // *before* sending out our signal to
    // third-party modules, and Master is
    // the final arbiter of volume before
    // the signal is passed to our final
    // destination.
    var pre_aux_gain = context.createGain();
    pre_aux_gain.gain.value = 1;
    var master_gain = context.createGain();
    master_gain.gain.value = 0.1;

    // CONNECTIONS
    // Here we link all our nodes
    // together. The final setting
    // of `context.destination`
    // pipes the resulting sounds
    // to our audio output, so we
    // can hear it.
    vco1.connect(vco1_volume);
    vco1_volume.connect(vca);
    vco2.connect(vco2_volume);
    vco2_volume.connect(vca);
    vca.connect(pre_aux_gain);
    vca.connect(pre_aux_gain);
    pre_aux_gain.connect(master_gain);
    // master_gain.connect(context.destination);

    /**
     * ---------------------
     * AUXILIARY CONNECTIONS
     *
     * Expose aux in and out
     * ---------------------
     */
    function aux_out() {
        var aux_out_object = {
            context: context,
            signal: pre_aux_gain
        };
        return aux_out_object;
    }
    function aux_in(input) {
        input.connect(master_gain);
    }
    function master_out(input) {
        var master_object = {
            context: context,
            signal: master_gain
        };
        return master_object;
    }

    /**
     * -------------------------------------
     * NOTE CONTROLS
     *
     * These methods begin and end our note.
     *
     * `note_start()` is passed a frequency,
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
    function note_start(note) {
        vco1.frequency.value = note; // Set note pitch
        vco2.frequency.value = note / vco2_pitch_mulitplier; // Set note pitch
        vca.gain.value = 1; // Start note
    }
    function note_end() {
        vca.gain.value = 0; // End note
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

    function master_volume_control(volume) {
        master_gain.gain.value = volume;
    }

    function vco1_volume_control(volume) {
        vco1_volume.gain.value = volume;
    }

    function vco2_volume_control(volume) {
        vco2_volume.gain.value = volume;
    }

    function vco1_wave_control(wave_type) {
        vco1_wave = _handle_wave_type(wave_type);
        vco1.type = vco1_wave;
    }

    function vco2_wave_control(wave_type) {
        vco2_wave = _handle_wave_type(wave_type);
        vco2.type = vco2_wave;
    }

    function vco2_pitch_control(pitch_multiplier) {
        vco2_pitch_mulitplier = pitch_multiplier;
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
    function _control_router(name, value) {
        // console.log('the ' + name + ' control has been set to ' + value);
        switch (name) {
            case 'master_volume':
                master_volume_control(value);
                break;
            case 'oscOneVolume':
                vco1_volume_control(value);
                break;
            case 'oscTwoVolume':
                vco2_volume_control(value);
                break;
            case 'oscOneWave':
                vco1_wave_control(value);
                break;
            case 'oscTwoWave':
                vco2_wave_control(value);
                break;
            case 'oscTwoPitch':
                vco2_pitch_control(value);
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
    function _handle_wave_type(rawWaveValue) {
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
        handle_wave_type: _handle_wave_type,
        control_changed: _control_router,
        note_start: note_start,
        note_end: note_end,
        aux_out: aux_out,
        aux_in: aux_in,
        master_out: master_out
    };

    return publicAPI;
}

export default SoundsAPI;
