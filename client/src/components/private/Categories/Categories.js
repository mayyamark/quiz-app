import { memo, useEffect } from 'react';
import CustomTable from '../../CustomTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const Categories = memo((props) => {
  const { categories, loading, error, onInitCategories, hasCategories } = props;

  useEffect(() => {
    onInitCategories();
  }, [onInitCategories]);

    return (
      <>
        {loading ?
          <CircularProgress /> :
          hasCategories ?
            <div id="student-dashboard-categories-container" >
              <h1>Categories</h1>
              <CustomTable
                customIdName="student-dashboard-categories-table"
                tableHead={['No', 'Category']}
                tableBody={categories.map((category) => {
                  return {
                    id: <>{category.id}</>,
                    category: <Link to ={`/quizzes?page=1&category=${category.name}`}>{category.name}</Link>,
                  };
                })}
              />
            </div>
          : null
        }
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