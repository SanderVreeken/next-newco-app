import reducer, { initialState } from '../Reducer';
// The StateProvider is a higher order component.
import { StateProvider } from '../components/StateProvider';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp