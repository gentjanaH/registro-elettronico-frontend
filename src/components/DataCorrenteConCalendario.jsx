
import { addDays, subDays, format, isValid } from "date-fns";
import { it } from "date-fns/locale";
import { Button } from "react-bootstrap";
const DataCorrenteConCalendario = ({ selectedDate, onChangeDate }) => {

    const baseDate = selectedDate ? new Date(selectedDate) : new Date();
    const validDate = isValid(baseDate) ? baseDate : new Date();

    const prevDay = () => onChangeDate(subDays(validDate, 1));
    const nextDay = () => onChangeDate(addDays(validDate, 1));

    const isToday = (date) => {
        const today = new Date();
        return date?.toDateString() === today.toDateString();
    };


    return (



        <div className="d-flex align-items-center gap-3 my-3">

            <Button variant="light" onClick={prevDay}>
                ‹
            </Button>

            <div
                className="px-4 py-2 rounded"
                style={{
                    backgroundColor: isToday(validDate) ? "#d1e7dd" : "#f8f9fa",
                    border: "1px solid #ccc",
                    fontWeight: "bold"
                }}
            >
                {isValid(validDate)
                    ? format(validDate, "dd/MM/yyyy", { locale: it })
                    : "Data non valida"}
            </div>

            <Button variant="light" onClick={nextDay}>
                ›
            </Button>

        </div>



    );

}

export default DataCorrenteConCalendario;