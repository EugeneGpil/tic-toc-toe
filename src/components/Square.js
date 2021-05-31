const Square = ({
  value,
  onClick
}) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
    {value}
    </button>
  )
}

export default Square

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }
