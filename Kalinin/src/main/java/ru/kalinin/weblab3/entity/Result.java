package ru.kalinin.weblab3.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import ru.kalinin.weblab3.util.Checker;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;


@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Result implements Serializable, Cloneable {
    double x, y, r = 3;
    boolean successful;
    long time;

    public Result(double x, double y, double r, long time){
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = time;
    }

    public String getSuccessString() {
        return Checker.isOnPlot(x,y,r) ? "Да" : "Нет";
    }

    public String getFormattedTime() {
        return new SimpleDateFormat("dd.MM.yy HH:mm:ss")
                .format(new Date(time));
    }

    @Override
    public Result clone() {
        Result cloned = new Result();
        cloned.x = x;
        cloned.y = y;
        cloned.r = r;
        return cloned;
    }
}
