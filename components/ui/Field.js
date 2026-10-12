import Icon from './Icon';
import styles from './Field.module.css';

/*
 * Form controls. Every control has a visible <label>, optional hint, and an error
 * message wired via aria-describedby + aria-invalid. Required is stated in text,
 * not only with an asterisk. `force` pins hover/focus for the styleguide.
 */

function describedBy(id, hint, error) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}

function Meta({ id, hint, error }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </>
  );
}

function Label({ id, label, required, showOptional = true, as: Tag = 'label' }) {
  const props = Tag === 'label' ? { htmlFor: id } : { id: `${id}-legend` };
  return (
    <Tag className={styles.label} {...props}>
      {label}
      {required ? <span className={styles.req}> (required)</span> : showOptional && <span className={styles.opt}> (optional)</span>}
    </Tag>
  );
}

export function TextField({ id, label, hint, error, required, type = 'text', force, ...rest }) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={styles.control}
        data-force={force}
        {...rest}
      />
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({ id, label, hint, error, required, rows = 5, force, ...rest }) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${styles.control} ${styles.textarea}`}
        data-force={force}
        {...rest}
      />
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({ id, label, hint, error, required, options, placeholder = 'Choose…', force, ...rest }) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} required={required} />
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={id}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${styles.control} ${styles.select}`}
          data-force={force}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} className={styles.chevron} />
      </div>
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function Checkbox({ id, label, hint, error, required, ...rest }) {
  return (
    <div className={styles.field}>
      <div className={styles.check}>
        <input
          id={id}
          name={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={styles.box}
          {...rest}
        />
        <label htmlFor={id} className={styles.checkLabel}>
          {label}
          {required && <span className={styles.req}> (required)</span>}
        </label>
      </div>
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function RadioGroup({ id, label, hint, error, required, options, value, onChange, defaultValue, disabled, showOptional = true }) {
  return (
    <fieldset
      className={`${styles.field} ${styles.fieldset}`}
      aria-describedby={describedBy(id, hint, error)}
      aria-invalid={error ? 'true' : undefined}
    >
      <Label id={id} label={label} required={required} showOptional={showOptional} as="legend" />
      <div className={styles.radios}>
        {options.map((o) => (
          <div key={o} className={styles.check}>
            <input
              id={`${id}-${o}`}
              name={id}
              type="radio"
              value={o}
              required={required}
              disabled={disabled}
              className={`${styles.box} ${styles.radio}`}
              {...(onChange ? { checked: value === o, onChange } : { defaultChecked: defaultValue === o })}
            />
            <label htmlFor={`${id}-${o}`} className={styles.checkLabel}>
              {o}
            </label>
          </div>
        ))}
      </div>
      <Meta id={id} hint={hint} error={error} />
    </fieldset>
  );
}
