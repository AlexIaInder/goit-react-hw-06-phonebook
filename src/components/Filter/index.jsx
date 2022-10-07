import { useDispatch, useSelector } from 'react-redux';
import { serchFilter } from '../../redux/slice';
import './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      name="filter"
      onChange={event => dispatch(serchFilter(event.target.value))}
      placeholder="Find contacts by name"
    />
  );
};

export default Filter;
