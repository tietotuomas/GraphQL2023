const Message = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div
        style={{
          backgroundColor: '#ffcccc', // Background color
          color: '#ff0000', // Text color
          padding: '10px', // Padding around the message
          border: '1px solid #ff0000', // Border around the message
          borderRadius: '5px', // Rounded corners
          maxWidth: '300px', // Maximum width of the message
          margin: '20px 20px 0 0' //Space above & below
        }}
      >
        {errorMessage}
      </div>
    )
  }
}

export default Message
