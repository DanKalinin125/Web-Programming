<%@ page import="beans.Row" %>
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
        <jsp:useBean id="table" class="beans.Table" scope="session" />
        <jsp:useBean id="check" class="beans.Row" scope="session" />
        <html>

        <head>
            <meta charset="UTF-8">
            <title>User Java Bean Page</title>
            <style>
                .areas {
                    width: 25%;
                    display: block;
                    margin: 0 auto;
                }
            </style>
        </head>

        <body>
            <!-- Отчистка таблицы -->
            <form id="clear-form" action="controller" method="post">
                <button id="btn-clear" type="submit">Очистить таблицу</button>
            </form>
            
            <!-- Возврат назад -->
            <form id="go-back-form" action="Lab2" method="post">
                <button id="btn-go-back" type="submit">Вернуться к форме</button>
            </form>
            
            <!-- Вспомогательный блок -->
            <div id="result"></div>
            <div class="graph-conteiner">
                <canvas class="areas"></canvas>
                <script>
                    var checkX = <%= check.getX()%>;
                    var checkY = <%= check.getY()%>;
                    var checkR = <%= check.getR()%>;
                </script>
            </div>
            
            <!-- Таблица -->
            <table id="result_table" border="1" cellpadding="0" cellspacing="0" width="100%" class="results">
                <thead>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время запроса</th>
                    <th>Время работы, c</th>
                </thead>
                <tbody id="table-data">
                    <%
                        if (table != null) {
                            for (Row row : table.getRows()) {
                        %>
                        <tr>
                            <td>
                                <%=row.getX()%>
                            </td>
                            <td>
                                <%=row.getY()%>
                            </td>
                            <td>
                                <%=row.getR()%>
                            </td>
                            <td style='color:<%=(row.getResult() ? "lime" : "red")%>'>
                                <%= row.getResult() ? "В области" : "Все области" %>
                            </td>
                            <td>
                                <%=row.getCurrentTime()%>
                            </td>
                            <td>
                                <%=row.getExecutionTime()%>
                            </td>
                        </tr>
                        <%
                                }
                            }
                        %>
                </tbody>
            </table>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
            <script src="graph.js"></script>
            <script src="result-script.js"></script>
        </body>

        </html>