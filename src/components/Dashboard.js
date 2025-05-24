import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Chip, IconButton, Badge
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Dashboard = () => {
  const [asistencias] = useState([
    {
      idClase: 'CL001', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Lunes', hora: '08:00',
      clase: 'Matemáticas', confirmada: true, tipo: 'Académica'
    },
    {
      idClase: 'CL002', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Miércoles', hora: '08:00',
      clase: 'Física', confirmada: true, tipo: 'Deportiva'
    },
    {
      idClase: 'CL003', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Lunes', hora: '12:00',
      clase: 'Programación', confirmada: true, tipo: 'Cultural'
    },
    {
      idClase: 'CL004', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Martes', hora: '10:00',
      clase: 'Historia', confirmada: true, tipo: 'Artística'
    },
    {
      idClase: 'CL005', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Jueves', hora: '12:00',
      clase: 'Física', confirmada: false, tipo: 'Relajación'
    },
    {
      idClase: 'CL006', nombreUsuario: 'Juan Pérez', identificacion: '123456789', rol: 'Estudiante',
      estudiante: 'Juan Pérez', fecha: '2025-05-08', día: 'Viernes', hora: '08:00',
      clase: 'Algoritmos', confirmada: false, tipo: 'Deportiva'
    }
  ]);

  const Bienvenido = () => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#910000', textAlign: 'left' }}>
        Bienvenido Pepito Pérez
      </Typography>
      <IconButton
        sx={{
          backgroundColor: '#910000',
          borderRadius: '50%',
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '&:hover .MuiSvgIcon-root': {
            color: '#910000',
          },
        }}
      >
        <Badge badgeContent={0} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Box>
  );

  const [horario, setHorario] = useState([]);

  useEffect(() => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horasUnicas = [...new Set(asistencias.map(a => a.hora))].sort();
    const horarioGenerado = horasUnicas.map(hora => {
      const fila = { hora };
      dias.forEach(dia => {
        const clase = asistencias.find(a => a.confirmada && a.hora === hora && a.día === dia);
        fila[dia.toLowerCase()] = clase ? clase.clase : '';
      });
      return fila;
    });
    setHorario(horarioGenerado);
  }, [asistencias]);

  const headerStyle = {
    backgroundColor: '#910000',
    color: '#fff',
    fontWeight: 'bold'
  };

  const cellStyle = {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '8px',
    fontSize: '14px'
  };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Bienvenido />
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Horario de Clases
            </Typography>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Hora</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Lunes</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Martes</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Miércoles</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Jueves</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Viernes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {horario.map((fila, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle, fontWeight: 'bold' }}>{fila.hora}</TableCell>
                    <TableCell sx={cellStyle}>{fila.lunes}</TableCell>
                    <TableCell sx={cellStyle}>{fila.martes}</TableCell>
                    <TableCell sx={cellStyle}>{fila.miércoles}</TableCell>
                    <TableCell sx={cellStyle}>{fila.jueves}</TableCell>
                    <TableCell sx={cellStyle}>{fila.viernes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Asistencia
            </Typography>
            {asistencias.map((item, idx) => (
              <Accordion key={idx} sx={{ backgroundColor: item.confirmada ? '#e8f5e9' : '#ffebee', mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <strong>{item.clase}</strong> - {item.día} - {item.hora}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>ID Clase:</strong> {item.idClase}</Typography>
                  <Typography><strong>Usuario:</strong> {item.nombreUsuario}</Typography>
                  <Typography><strong>Identificación:</strong> {item.identificacion}</Typography>
                  <Typography><strong>Rol:</strong> {item.rol}</Typography>
                  <Typography><strong>Estudiante:</strong> {item.estudiante}</Typography>
                  <Typography><strong>Fecha:</strong> {item.fecha}</Typography>
                  <Typography><strong>Día:</strong> {item.día}</Typography>
                  <Typography><strong>Hora:</strong> {item.hora}</Typography>
                  <Typography><strong>Tipo de Actividad:</strong> {item.tipo}</Typography>
                  <Typography>
                    <strong>Asistencia:</strong>{' '}
                    <Chip
                      label={item.confirmada ? 'Sí' : 'No'}
                      color={item.confirmada ? 'success' : 'error'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
