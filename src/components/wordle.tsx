import RowCompleted from "./rowCompleted";
import RowCurrent from "./rowCurrent";
import RowEmpty from "./rowEmpty";

export default function Wordle() {
    return <div>
        <RowCompleted word="sabin" solution="sabio"></RowCompleted>
        <RowEmpty></RowEmpty>
        <RowCurrent word="sab"></RowCurrent>
        </div>
}