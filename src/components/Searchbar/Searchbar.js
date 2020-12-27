import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onHandleSubmit, onSearchQueryChange, value }) {
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onHandleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onSearchQueryChange}
        />
      </form>
    </header>
  );
}
// <header className="Searchbar">
//   <form className="SearchForm">
//     <button type="submit" className="SearchForm-button">
//       <span className="SearchForm-button-label">Search</span>
//     </button>

//     <input
//       className="SearchForm-input"
//       type="text"
//       autocomplete="off"
//       autofocus
//       placeholder="Search images and photos"
//     />
//   </form>
// </header>

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Searchbar;
