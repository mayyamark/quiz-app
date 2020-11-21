import { memo, useEffect } from 'react';
import CustomTable from '../../common/CustomTable/CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import './Categories.css';
const Categories = memo((props) => {
  const { categories, loading, error, onInitCategories, hasCategories } = props;

  useEffect(() => {
    onInitCategories();
  }, [onInitCategories]);

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : loading ? (
        <CircularProgress />
      ) : hasCategories ? (
        <div id="student-dashboard-categories-container">
          <h1>Categories</h1>
          <CustomTable
            customIdName="student-dashboard-categories-table"
            tableHead={['No', 'Category']}
            tableBody={categories.map((category, index) => {
              return {
                id: <>{index + 1}</>,
                category: (
                  <Link
                    to={`/quizzes?page=1&category=${category.name}`}
                    id={!category.isActive ? 'disabled' : ''}
                  >
                    {category.name}
                  </Link>
                ),
              };
            })}
          />
        </div>
      ) : null}
    </>
  );
});

Categories.defaultProps = {
  categories: {},
  error: false,
  loading: false,
  hasCategories: false,
  onInitCategories: () => {},
};

export default Categories;
