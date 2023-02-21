package ru.kalinin.weblab3.bean;

import com.google.gson.GsonBuilder;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import jakarta.validation.ValidationException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import ru.kalinin.weblab3.entity.Result;
import ru.kalinin.weblab3.util.Checker;

import java.io.Serializable;
import java.sql.*;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Named
@ApplicationScoped
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultsBean implements Serializable {

    final String URL = "jdbc:postgresql://pg/studs"; //Для сервера
    //final String URL = "jdbc:postgresql://localhost:5201/studs"; //Для локальной работы

    final List<Result> results = new CopyOnWriteArrayList<>();
    Result current = new Result();
    Connection connection = null;

    public ResultsBean() {
        //Заполняем список результатов results
        tryConnect();
    }

    public void tryConnect(){
        try {
            connection = DriverManager.getConnection(URL);

            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM results;");
            while(rs.next()){
                double x = rs.getDouble("x");
                double y = rs.getDouble("y");
                double r = rs.getDouble("r");
                long time = rs.getLong("time");

                Result newResult = new Result(x, y, r, time);
                newResult.setSuccessful(Checker.isOnPlot(x,y,r));
                results.add(newResult);
            }

        } catch (Exception exception){
            FacesContext.getCurrentInstance().addMessage("main_table", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "SQL Error",
                    exception.getMessage()
            ));
        }
    }

    public void addResultFromPlot() {
        var params = FacesContext.getCurrentInstance()
                .getExternalContext().getRequestParameterMap();

        try {
            double x = Double.parseDouble(params.get("x")),
                y = Double.parseDouble(params.get("y"));

            if (x >= -3 && x <= 5 && y > -5 && y < 5) {
                current.setX(x);
                current.setY(y);
                addResult();
            } else throw new ValidationException();
        } catch (Exception ex) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "Validation Error",
                    "Wrong parameters values."
            ));
        }
    }


    public void addResult() {
        //Добавить результат в БД
        try{
            if (connection == null){
                tryConnect();
            }

            PreparedStatement statement = connection.prepareStatement("INSERT INTO results VALUES (?, ?, ?, ?);");
            statement.setDouble(1, current.getX());
            statement.setDouble(2, current.getY());
            statement.setDouble(3, current.getR());
            statement.setLong(4, current.getTime());
            statement.execute();

            current.setSuccessful(Checker.isOnPlot(current.getX(), current.getY(), current.getR()));
            current.setTime(System.currentTimeMillis());
            results.add(current);
            current = current.clone();

        } catch (Exception exception){
            FacesContext.getCurrentInstance().addMessage("main_table", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "SQL Add Error",
                    exception.getMessage()
            ));
        }
    }

    public void clearResults() {
        //Отчистить все результаты
        try{
            if (connection == null){
                tryConnect();
            }

            Statement statement = connection.createStatement();
            statement.executeUpdate("DELETE FROM results;");
        }
        catch (Exception exception){
            FacesContext.getCurrentInstance().addMessage("main_table", new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "SQL Clear Error",
                    exception.getMessage()
            ));
        }
        results.clear();
    }

    public String parseResultsToJson() {
        return new GsonBuilder().create().toJson(results.stream()
                .peek(result -> result.setSuccessful(Checker.isOnPlot(
                        result.getX(),
                        result.getY(),
                        current.getR()
                )))
                .toArray());
    }


}
