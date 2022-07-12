import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { FormControlLabel, MenuItem, Switch, Tooltip, CircularProgress  } from '@material-ui/core';
import SecurityIcon from '@material-ui/icons/Security';
import WarningIcon from '@material-ui/icons/Warning';
import { SSOLoginButton } from '../component/sso/SSOLoginButton';

/**
 * Configures setting the current Neo4j database connection for the dashboard.
 */
export default function NeoConnectionModal({ open, standalone, standaloneSettings, ssoSettings, connection, 
    dismissable = false, createConnection, onConnectionModalClose, onSSOAttempt }) {

    const protocols = ["neo4j", "neo4j+s", "neo4j+ssc", "bolt", "bolt+s", "bolt+ssc"]
    const [ssoVisible, setSsoVisible] = React.useState(ssoSettings['ssoEnabled']);
    // Make sure local vars are updated on external connection updates.
    useEffect(() => {
        createConnection(process.env.REACT_APP_PROTOCOL, process.env.REACT_APP_URL, process.env.REACT_APP_PORT, process.env.REACT_APP_DATABASE, process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD);
    }, [])

    useEffect(() => {
        setSsoVisible(ssoSettings['ssoEnabled'])
    }, [JSON.stringify(ssoSettings)])

    const discoveryAPIUrl = ssoSettings && ssoSettings.ssoDiscoveryUrl; 
   
    return (
        <div>
           
            <Dialog maxWidth="xs" open={open == true} onClose={() => { dismissable ? onConnectionModalClose() : null }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{standalone ? "Connecting to Dashboard" : "Connecting to Neo4j"}
                    <IconButton style={{ padding: "3px", float: "right" }}>
                        <Badge badgeContent={""} >
                            <img style={{ width: "36px", height: "36px" }} src="neo4j-icon-color.png" />
                        </Badge>
                    </IconButton>
                </DialogTitle>
                <DialogContent>

                <CircularProgress color="inherit" />


                 


                </DialogContent>
            </Dialog>
        </div>
    );
}