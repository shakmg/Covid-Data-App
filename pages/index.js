import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';

const todaysDate = new Date().toDateString();
export default class Home extends React.Component {
  state = {
    countries: [],
    globalSummary: {},
    errorMessage: '',
  };

  componentDidMount = () => {
    axios
      .get('https://api.covid19api.com/summary')
      .then((res) => {
        this.setState({
          countries: res.data.Countries,
          globalSummary: res.data.Global,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Covid Data App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.HeadingWrapper}>
          <h1 className={styles.globalTitle}>Global Information Summary</h1>
          <div className={styles.date}>{todaysDate}</div>
        </div>
        {this.state.errorMessage && (
          <h3>There has been the following error: {this.state.errorMessage}</h3>
        )}
        <div className={styles.globalSummaryWrapper}>
          <ul className={styles.globalBulletPoints}>
            <li>
              New Confirmed Cases Today -{' '}
              {this.state.globalSummary.NewConfirmed}
            </li>
            <li>
              Total Confirmed Cases - {this.state.globalSummary.TotalConfirmed}
            </li>
            <li>
              New Deaths Today -
              <span className={styles.warningInformation}>
                {this.state.globalSummary.NewDeaths}
              </span>
            </li>
            <li>
              Total Deaths -
              <span className={styles.warningInformation}>
                {this.state.globalSummary.TotalDeaths}
              </span>
            </li>
            <li>
              New Recovered Today -
              <span className={styles.positiveInformation}>
                {this.state.globalSummary.NewRecovered}
              </span>
            </li>
            <li>
              Total Recovered -
              <span className={styles.positiveInformation}>
                {this.state.globalSummary.TotalRecovered}
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.countriesWrapper}>
          <h2 className={styles.countriesTitle}>
            Countries affected by Covid19
          </h2>
          {this.state.countries.map(({ CountryCode, Country }) => {
            return (
              <div className={styles.countryName} key={CountryCode}>
                {Country}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
