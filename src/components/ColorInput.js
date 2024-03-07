import styles from "./ColorInput.module.css";

function isValidColorCode(value) {
  return /^#[a-fA-F0-9]{6}$/.test(value);
}

export default function ColorInput({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  function handleBlur() {
    if (!isValidColorCode(value)) {
      onChange("#000000");
    }
  }

  return (
    <div className={styles.colorInput}>
      <input
        className={styles.input}
        value={value}
        maxLength={7}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isValidColorCode(value) && (
        <span
          className={styles.chip}
          style={{
            backgroundColor: value,
          }}
        ></span>
      )}
    </div>
  );
}
