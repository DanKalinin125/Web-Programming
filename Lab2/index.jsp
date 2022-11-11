<%@ page contentType="text/html; charset=UTF-8" language="java"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Lab2</title>
        <style>
            main {
                text-align: center;
            }
            
            .notes{
              position: fixed;
              top: 15px;
              right: 15px;
              width: 300px;
            }
            
            .note{
                font-size: 0.875rem;
                  background-clip: padding-box;
                  border: 1px solid rgba(0, 0, 0, 0.05);
                  border-radius: 0.25rem;
                  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, 0.075);
                  position: relative;
                  overflow: hidden;
                  transition: 0.3s opacity;
            }
            
            .note__title{
                position: relative;
                  padding: 0.5rem 2.25rem 0.5rem 1rem;
                  background-color: rgba(0, 0, 0, 0.03);
                  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .note__message {
              padding: 1rem;
            }
            
            .hide-me {
                animation: cssAnimation 0s ease-in 3s forwards;
                animation-fill-mode: forwards;
            }
            
            @keyframes cssAnimation {
                to {
                    width:0;
                    height:0;
                    overflow:hidden;
                }
            }
            
            .disabled
            {
                background-color: #DDD;
                color: #999;
            }
            
            .areas{
                width: 25%;
                display: block;
                margin: 0 auto;
            }

        </style>
    </head>

    <body>
        <header>
            <div>
                <p>Калинин Даниил</p>
                <p>P32141</p>
                <p>Вариант: 14193</p>
            </div>
        </header>
        <main>
            <!-- График -->
            <div class = "graph-conteiner">
                <canvas class="areas" id="graph"></canvas>
            </div>
            
            <!-- Форма -->
            <form id="check-form" action="controller" method="post">
                <p>Введите X:</p>
                <input type="button" name="x" id="btn-x" value="-3" />
                <input type="button" name="x" id="btn-x" value="-2" />
                <input type="button" name="x" id="btn-x" value="-1" />
                <input type="button" name="x" id="btn-x" value="0" />
                <input type="button" name="x" id="btn-x" value="1" />
                <input type="button" name="x" id="btn-x" value="2" />
                <input type="button" name="x" id="btn-x" value="3" />
                <input type="button" name="x" id="btn-x" value="4" />
                <input type="button" name="x" id="btn-x" value="5" />
                <p>Введите Y:</p>
                <input type="text" name="y" id="input_y" value="" />
                <p>Введите R:</p>
                <input type="radio" name="r" class="rd-r" value="1" />1
                <input type="radio" name="r" class="rd-r" value="1.5" />1.5
                <input type="radio" name="r" class="rd-r" value="2" />2
                <input type="radio" name="r" class="rd-r" value="2.5" />2.5
                <input type="radio" name="r" class="rd-r" value="3" />3
                <br>
                <button id="btn" type="submit">Отправить</button>
            </form>
            
            <!-- Уведомления -->
            <div class="notes">
            </div>
            
            <!-- Вспомогательный блок -->
            <div id="result">
            </div>
        </main>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="graph.js"></script>
        <script src="main-script.js"></script>
    </body>

    </html>