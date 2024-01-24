export default function Test () {
  return (
    <>
      <h1>Parent</h1>
      <ChildTest />
    </>
  )
}

function ChildTest () {
  return <h1>Child</h1>
}