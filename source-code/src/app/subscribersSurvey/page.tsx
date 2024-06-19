"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const SubscribersSurvey = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [option, setOption] = useState('')
    const [description, setDescription] = useState('')

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setOption(event.target.value)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const isEngineeringManager = option === 'isEngineeringManager'
        const isTechRecruiter = option === 'isTechRecruiter'
        const isFellowDeveloper = option === 'isFellowDeveloper'
        const other = option === 'other'

        console.log('Selected option:', option)
        console.log('isEngineeringManager:', isEngineeringManager)
        console.log('isTechRecruiter:', isTechRecruiter)
        console.log('isFellowDeveloper:', isFellowDeveloper)
        console.log('other', other)

        const body = {
            name,
            email,
            phoneNumber,
            isEngineeringManager,
            isTechRecruiter,
            isFellowDeveloper,
            other,
            description
        }

        try {
            const response = await fetch('/api/postSubscribersSurvey', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            if (response.ok) {
                console.log('row inserted successfully!', data)
                setName('')
                setEmail('')
                setPhoneNumber('')
                setOption('')
                setDescription('')
            } else {
                console.log('error inserting row:', data.error)
            }
        } catch (error) {
            console.error('internal server error', error)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
                '& .MuiFormControl-root': { m: 1, width: '100%' },
                maxWidth: 600,
                margin: 'auto',
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'white'
            }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                Please fill out this survey so I can get to know a little more about you!
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPhoneNumber(event.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">What are you?</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={option}
                            onChange={handleChange}
                            label="Options"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'isEngineeringManager'}>Engineering Manager</MenuItem>
                            <MenuItem value={'isTechRecruiter'}>Tech Recruiter</MenuItem>
                            <MenuItem value={'isFellowDeveloper'}>Another Developer</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    {option === 'other' && (
                <Grid item xs={10}>
                    <TextField
                        label="Please specify"
                        value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDescription(event.target.value) }}
                        fullWidth
                    />
                </Grid>
            )}
                </Grid>
                <Grid item xs={10} textAlign="center">
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SubscribersSurvey