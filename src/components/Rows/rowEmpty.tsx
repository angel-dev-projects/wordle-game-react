import Box from "../Box/box";
import styles from "./row.module.scss";

export default function RowEmpty() {
  return (
    <div className={styles.row}>
      {Array.from(Array(5)).map((_, i) => (
        <Box key={i} value="" status="empty"></Box>
      ))}
    </div>
  );
}
