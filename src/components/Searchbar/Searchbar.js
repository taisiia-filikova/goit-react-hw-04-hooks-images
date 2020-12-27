import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return toast.info('Please, enter something');
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="What do you want to find?"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
