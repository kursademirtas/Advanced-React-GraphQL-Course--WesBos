import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
  return query.token ? <Reset token={query.token}/> : <RequestReset />;
}
