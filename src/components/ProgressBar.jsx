import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const ProgressBar = (props) => {
  const { value, sx } = props;

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#01579b' : '#308fe8',
    },
  }));

  return (
    <Card sx={{width: "50%"}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Monthly goal
            </Typography>
            <Typography variant="h4">
              {value}%
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ mt: 3 }}>
          {/* <LinearProgress
            sx={{ height: '15px', backgroundColor: '#2E4164', : '#2E4164'}}
            value={value}
            variant="determinate"
          /> */}
          <BorderLinearProgress variant="determinate" value={75.5} />
        </Box>
      </CardContent>
    </Card>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};

export default ProgressBar;