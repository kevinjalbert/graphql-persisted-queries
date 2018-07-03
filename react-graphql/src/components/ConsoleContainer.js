import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import QUERY from '../graphql/ConsolesByYear.graphql';

const ConsolesAndCompany = ({ afterYear, beforeYear }) => (
  <Query query={QUERY} variables={{ afterYear, beforeYear }}>
    {({ data, error, loading }) => {
      if (error) return 'Error!';
      if (loading) return 'Loading';

      return (
        <React.Fragment>
          {
            data.consoles.map(console => (
              <div key={console.name}>
                <h3>{console.name}</h3>
                <h4>Release Year: {console.releaseYear}</h4>
                <h4>Company: {console.company.name}</h4>
                <br />
              </div>
            ))
          }
        </React.Fragment>
      );
    }}
  </Query>
);

ConsolesAndCompany.propTypes = { afterYear: PropTypes.number, beforeYear: PropTypes.number };

export default ConsolesAndCompany;
