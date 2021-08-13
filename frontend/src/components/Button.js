function Button(props) {
  return (
    <a href={ props.onClick } ><button className="btn btn-light" >{ props.text }</button></a>
  );
}

export default Button;
