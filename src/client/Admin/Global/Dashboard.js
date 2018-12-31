import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Bar, Doughnut } from 'react-chartjs-2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import auth from '../../Auth/Auth/Auth';
import Card from '../../Static/Card/Card';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
      visits: null
    };
  }

  async componentDidMount() {
    const article = (await axios.get(`${process.env.API_URL}/retrieveArticles/`)).data;
    // Users Stats
    const listUsers = (await axios.get(`${process.env.API_URL}/admin/listUsers/0/10/`, {
      headers: {
        tokenauthorization: `${auth.getIdToken()}`
      }
    })).data;

    //  Visits Week Stats
    const visitsWeek = (await axios.get(
      `${process.env.API_URL}/stat/get-stat-time/visits/${Date.now()
        - 7 * 24 * 60 * 1000 * 60}/${Date.now() - 0}/86400000`,
      {
        headers: {
          tokenauthorization: `${auth.getIdToken()}`
        }
      }
    )).data;
    const labelsWeeks = [];
    const nameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daynow = new Date().getDay();
    for (let i = 7; i > 0; i--) {
      let dayIndex = (daynow - i + 1) % 7;
      if (dayIndex < 0) {
        dayIndex += 7;
      }

      labelsWeeks.push(nameDays[dayIndex]);
    }
    const visitsWeekCount = visitsWeek.map(list => list.length);
    const dataWeekVisits = {
      labels: labelsWeeks,
      datasets: [
        {
          label: 'Visits last week',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: visitsWeekCount
        }
      ]
    };

    const totalVisitsWeek = visitsWeekCount.reduce((accumulator, x) => accumulator + x);
    // Registering the state

    this.setState({
      article,
      dataWeekVisits,
      totalVisitsWeek,
      listUsers
    });
  }

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item lg={8} xs={12}>
            <Grid container spacing={24} justify="center">
              <Grid item xs={6}>
                <Card>
                  <div className="card_body">
                    <div className="card_title">Manage Users</div>
                    {this.state.listUsers && (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Mail Address</TableCell>
                            <TableCell align="right">Created At</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.listUsers.map(row => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.username}
                              </TableCell>
                              <TableCell align="right">{row.email}</TableCell>
                              <TableCell align="right">{row.createdAt}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <div className="card_body">
                    <div className="card_title">Manage Songs</div>
                    qdsfqs
                  </div>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card>
                  <div className="card_body">
                    <div className="card_title">Analysis Overview</div>
                    {this.state.dataWeekVisits && (
                      <Bar
                        data={this.state.dataWeekVisits}
                        width={100}
                        height={50}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
                    )}
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <div className="card_body">
                    <div className="card_title">This week</div>
                    {this.state.totalVisitsWeek && (
                      <div style={{ textAlign: 'center' }}>
                        <div className="statBigTextRound elevation">
                          {this.state.totalVisitsWeek}
                          {' '}
                          <span>visits</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
