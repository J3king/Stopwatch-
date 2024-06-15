let startTime, updatedTime, difference, tInterval;
        let running = false;
        const timeDisplay = document.querySelector('.time');
        const lapContainer = document.querySelector('.laps');

        function startStop() {
            if (!running) {
                startTime = new Date().getTime() - (difference || 0);
                tInterval = setInterval(getShowTime, 1);
                running = true;
                document.querySelector('.buttons button:first-child').textContent = "Pause";
            } else {
                clearInterval(tInterval);
                difference = new Date().getTime() - startTime;
                running = false;
                document.querySelector('.buttons button:first-child').textContent = "Start";
            }
        }

        function reset() {
            clearInterval(tInterval);
            running = false;
            difference = 0;
            timeDisplay.textContent = "00:00:00";
            document.querySelector('.buttons button:first-child').textContent = "Start";
            lapContainer.innerHTML = "";
        }

        function recordLap() {
            if (running) {
                const lapTime = timeDisplay.textContent;
                const lapElement = document.createElement('div');
                lapElement.className = 'lap lap-slide';
                lapElement.textContent = lapTime;
                lapContainer.appendChild(lapElement);
            }
        }

        function getShowTime() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;

            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }