import { addDays, subDays, format, isValid, isToday } from "date-fns";
import { it } from "date-fns/locale";

const DataCorrenteConCalendario = ({ selectedDate, onChangeDate }) => {

    const baseDate = selectedDate ? new Date(selectedDate) : new Date();
    const validDate = isValid(baseDate) ? baseDate : new Date();

    const prevDay = () => onChangeDate(subDays(validDate, 1));
    const nextDay = () => onChangeDate(addDays(validDate, 1));
    const goToToday = () => onChangeDate(new Date());

    const oggi = isToday(validDate);

    return (
        <div className="datepicker-wrapper">

            {/* Giorno e mese grandi */}
            <div className="datepicker-main">
                <button className="datepicker-arrow" onClick={prevDay} title="Giorno precedente">
                    ‹
                </button>

                <div className="datepicker-center">
                    <div className="datepicker-giorno">
                        {format(validDate, "EEEE", { locale: it })}
                    </div>
                    <div className="datepicker-data">
                        {format(validDate, "d MMMM yyyy", { locale: it })}
                    </div>
                    {oggi && (
                        <div className="datepicker-oggi-badge">oggi</div>
                    )}
                </div>

                <button className="datepicker-arrow" onClick={nextDay} title="Giorno successivo">
                    ›
                </button>
            </div>

            {/* Bottone torna ad oggi */}
            {!oggi && (
                <button className="datepicker-oggi-btn" onClick={goToToday}>
                    Torna ad oggi
                </button>
            )}

        </div>
    );
};

export default DataCorrenteConCalendario;