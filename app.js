var tasks = []
        var counter = 0
        var btn = document.querySelector('#btn')
        btn.onclick = function (e) {
            var date = document.querySelector('#date')
            var taskText = document.querySelector('#newtask')
            if (taskText.value == "") {
                alert("You didn't write anything")
                return
            }
            var task = new Object()
            task.date = date.value;
            task.taskText = taskText.value;
            task.id = counter;
            console.log(task)
            task.toHTML = function () {
                return `<div class = "divesTsks">
                            <div style="position:relative;" >
                            <br>
                                <span class= "x" id="${this.id}" style="position:absolute;right:5px;top:10"
                                onclick = "remove(event)">X</span>
                            <div/>
                            <p>${this.taskText}</p><br>
                            <div class="date">
                            ${this.date}
                            <div/>
                        </div>`;
            }
            tasks.push(task);
            showTasks(task);
            localStorage.setItem("all", JSON.stringify(tasks));
            counter = counter + 1
        }
        
        function showTasks(task) {
            let html = task.toHTML();
            document.querySelector('#visuTasks').innerHTML += html;
        }
        window.onload = function (e) {
            var temp = localStorage.getItem("all");
            if (!temp) {
                return;
            }
            tasks = JSON.parse(temp);
            console.log(tasks)
            for (var i = 0; i < tasks.length; i++) {
                tasks[i].toHTML = function () {
                    return `<div class = "divesTsks">
                            <div style="position:relative;" >
                            <br>
                                <span class= "x" id="${this.id}" style="position:absolute;right:5px;top:10"
                                onclick = "remove(event)">X</span>
                            <div/>
                            <p>${this.taskText}</p><br>
                            <div class="date">
                            ${this.date}
                            <div/>
                        </div>`;
                }
                showTasks(tasks[i])
            }
            counter = tasks.length
        }
        btnD.onclick = function (e) {
            var task = document.querySelector('#newtask')
            var date = document.querySelector('#date')
            task.value = ''
            date.value = ''
        }
        function remove(e) {
            console.log(e.path)
            var id = e.path[0].id
            e.path[2].remove();
            console.log(id);
            tasks.splice(id, 1);
            console.log(tasks)
            for (var i = 0; i < tasks.length; i++) {
                tasks[i].id = i;
                document.querySelectorAll("span")[i].id = i
            }
            var spans = document.querySelectorAll("span")
            console.log(spans, tasks)
            localStorage.setItem("all", JSON.stringify(tasks))
            counter = counter - 1
        }