import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  selectbutton: (props) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: props.selected ? "gold" : "",
    color: props.selected ? "black" : "",
    fontWeight: props.selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  }),
}));

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles({ selected }); // Pass `selected` as a prop to styles

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
