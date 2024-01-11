export default function ({ redirect }) {
  if (localStorage.getItem('token') === null) {
    return redirect('/login')
  }
}
