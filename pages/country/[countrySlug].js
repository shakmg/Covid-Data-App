import { withRouter } from 'next/router';
import axios from 'axios';

class CountryDetail extends React.Component {
  componentDidMount = () => {
    axios
      .get(
        `https://api.covid19api.com/total/country/${this.props.router.query.countrySlug}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    console.log(this.props);
    return <h1>Test</h1>;
  }
}

export default withRouter(CountryDetail);
