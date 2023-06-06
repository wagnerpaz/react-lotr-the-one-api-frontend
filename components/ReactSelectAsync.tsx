import { AsyncPaginate } from "react-select-async-paginate";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    paddingTop: 0,
    marginTop: -7,
    backgroundColor: "transparent",
    color: "#e5e7eb",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#e5e7eb",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 99999,
  }),
  menu: (provided: any) => ({
    ...provided,
    color: "#e5e7eb",
    backgroundColor: "black",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "#e5e7eb",
    backgroundColor: "black",
  }),
};

const ReactSelectAsync = (props) => (
  <AsyncPaginate
    styles={customStyles}
    menuPortalTarget={document.body}
    menuPlacement="auto"
    {...props}
  />
);

export default ReactSelectAsync;
