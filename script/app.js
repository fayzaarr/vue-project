const App = Vue.createApp({
    data() {
        return {
            state: true,
            inputName: '',
            names: [],
            error: '',
            showError: false,
            result: ''
        }
    }, 
    computed: {
        isReady() {
            return this.names.length > 1;
        }
    },
    methods: {
        addNameToList() {
            const userName = this.inputName;
            if (this.validate(userName)) {
                this.names.push(userName);
                this.inputName = '';
                this.showError = false;
            } else {
                this.showError = true;
            }
        },
        validate(value) {
            this.error = '';
            if (value === '') {
                this.error = 'Sorry, name cannot be empty';
                return false;
            }
            if (this.names.includes(value)) {
                this.error = 'Sorry, names must be unique';
                return false;
            }
            return true;
        },
        removeName(index) {
            this.names.splice(index, 1);
        },
        showResult() {
            this.generateResult();
            this.state = false;
        },
        shuffleArray(array) {
            // Fisher-Yates shuffle algorithm
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        getRandomName() {
            return this.names[Math.floor(Math.random() * this.names.length)];
        },
        generateResult() {
            let attempts = 100; // Increase the number of shuffles
            const shuffle = () => {
                this.shuffleArray(this.names); // Shuffle names array

                let randName = this.getRandomName();
                // Ensure the new random name is different from the last result
                if (this.result !== '' && randName === this.result) {
                    randName = this.getRandomName();
                }
                this.result = randName;

                // Decrease the attempts and repeat with a random delay
                if (--attempts > 0) {
                    const randomDelay = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // Random delay between 50ms and 200ms
                    setTimeout(shuffle, randomDelay);
                }
            };
            shuffle();
        },
        resetApp() {
            this.state = true;
            this.inputName = '';
            this.names = [];
            this.error = '';
            this.showError = false;
            this.result = '';
        }, 
        getNewResult() {
            this.generateResult();
        }
    }
}).mount('#app');
