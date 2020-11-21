import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily: 'Lato',
    fontSize: 18,
  },
  body: {
    fontFamily: 'Lato',
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const CustomTable = (props) => {
  const { customIdName, tableHead, tableBody } = props;

  return (
    <TableContainer id={customIdName} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHead.map((thName) => <StyledTableCell align="center" key={thName}>{thName}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody.map((tbObject) => (
            <StyledTableRow key={Math.random()}>
              {Object.values(tbObject).map((propertyValue) => {
                  return <StyledTableCell align="center" key={Math.random().toString()} >{propertyValue}</StyledTableCell>;
                })
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;