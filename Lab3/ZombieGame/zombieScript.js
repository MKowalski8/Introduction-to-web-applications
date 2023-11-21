       
       document.querySelector('.startGame').addEventListener("click", () => {start(0)});


       function start(was_played){
        let board = document.querySelector('.board');
        let play = true;


        if (was_played){
            document.querySelector('.endGame').style.display = 'none'
            document.getElementById('heart3').setAttribute('src', 'full_heart.png'); 
            document.getElementById('heart2').setAttribute('src', 'full_heart.png');
            document.getElementById('heart1').setAttribute('src', 'full_heart.png'); 
            console.log(board.getElementsByClassName('zombie'))
            let zombies = board.getElementsByClassName('zombie');
            while(zombies.length != 0){
                zombies[0].remove();
            }
        }


        document.querySelector('.startGame').style.display = 'none'
        const pointer = document.querySelector('.pointer');
        pointer.style.display = 'block';
        board.style.cursor = 'none'
        let score = 33;
        let scoreValue = document.querySelector('.score');
        let lives = 3

            var createZombie = setInterval(function () {
                let zombie = document.createElement('div');
                zombie.classList.add('zombie');
                

                let min = 0;
                let max = 80;
                let bottomPos = Math.floor(Math.random()*(max-min+1)+min);

                let scale = 0.4 + Math.random() * 0.8;
                
                zombie.style.transform = "scale("+scale+")";
                zombie.style.bottom = bottomPos + 'px';
                zombie.style.zIndex = 150-bottomPos;

                min = 5;
                max = 15;
                // min = 1;
                // max = 5;
                let walkSpeed = Math.floor(Math.random()*(max-min+1)+min);
                // console.log(walkSpeed)
                let animation = walkSpeed*0.1+"s,"+walkSpeed+"s"
                zombie.style.animationDuration = animation;

                board.appendChild(zombie);

                zombie.addEventListener('animationend', function(zombies) {
                    if(zombies.animationName == "zombieWalk") {
                        lives-=1;
                        // console.log(lives)
                        this.remove();
                        switch (lives) {
                            case 2: document.getElementById('heart3').setAttribute('src', 'empty_heart.png'); break;
                            case 1: document.getElementById('heart2').setAttribute('src', 'empty_heart.png'); break;
                            case 0: document.getElementById('heart1').setAttribute('src', 'empty_heart.png'); 
                            startAgain();
                            break;
                        }
                    }
                });
            }, 400);



            board.addEventListener('click', function(object) {
                if (score > 0 && play){
                    if (object.target.classList.contains('zombie')) {
                        score += 10;
                        object.target.remove();
                } else {
                    score -= 3;
                }
                scoreValue.innerText = score;
                }
            });

            function startAgain(){
                // console.log('again')
                clearInterval(createZombie);
                play = false;
                const endGame = document.querySelector('.endGame');
                board.style.cursor = 'default';
                pointer.style.display = 'none';
                endGame.style.display = 'block';
                endGame.innerHTML = `GAME OVER` + "<br />" + `Your score is: ${score} points` +  "<br />" + "Click if you want to start again"
                endGame.addEventListener("click", () => {start(1)})
            }


            board.addEventListener('mousemove', function(mouseMovement){
                let xPosition;
                let yPosition;
                if (mouseMovement){
                    xPosition = mouseMovement.pageX;
                    yPosition = mouseMovement.pageY;
                    pointer.style.top = yPosition + 'px';
                    pointer.style.left = xPosition + 'px';
                }
            }
            )
        };