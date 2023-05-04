export default function StatusDetailComponent(props) {
  const { index, data } = props;
  return (
    <tr key={index}>
      <td>{data.url}</td>
      <td>{data.statusCode}</td>
      <td>{data.duration}</td>
      <td>{data.date}</td>
    </tr>
  );
}
