
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { UserPlus, Calendar, Clock, Search, PlusCircle, Calendar as CalendarIcon, MoreHorizontal, Check, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";

const weekDays = [
  { value: 0, label: "Domingo", shortLabel: "Dom" },
  { value: 1, label: "Lunes", shortLabel: "Lun" },
  { value: 2, label: "Martes", shortLabel: "Mar" },
  { value: 3, label: "Miércoles", shortLabel: "Mié" },
  { value: 4, label: "Jueves", shortLabel: "Jue" },
  { value: 5, label: "Viernes", shortLabel: "Vie" },
  { value: 6, label: "Sábado", shortLabel: "Sáb" }
];

const Employees = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [addScheduleOpen, setAddScheduleOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editScheduleMode, setEditScheduleMode] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
    },
  });

  const scheduleForm = useForm({
    defaultValues: {
      employee_id: "",
      shift_id: "",
      day_of_week: "",
    },
  });

  useEffect(() => {
    fetchEmployees();
    fetchShifts();
    fetchSchedules();
  }, []);
  
  useEffect(() => {
    if (selectedEmployee) {
      scheduleForm.setValue("employee_id", selectedEmployee.id);
    }
  }, [selectedEmployee, scheduleForm]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('business_id', user?.id)  // Filter by business_id
        .order('name');
      
      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los empleados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchShifts = async () => {
    try {
      const { data, error } = await supabase
        .from('shifts')
        .select('*')
        .eq('business_id', user?.id)  // Filter by business_id
        .order('start_time');
      
      if (error) throw error;
      setShifts(data || []);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  };
  
  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_schedules')
        .select(`
          id,
          day_of_week,
          employees (id, name),
          shifts (id, name, start_time, end_time)
        `)
        .eq('business_id', user?.id)  // Filter by business_id
        .order('day_of_week');
      
      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('employees')
        .insert([{
          ...data,
          business_id: user?.id
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Éxito",
        description: "Empleado agregado correctamente",
      });
      
      setAddEmployeeOpen(false);
      form.reset();
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el empleado",
        variant: "destructive",
      });
    }
  };
  
  const onScheduleSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('employee_schedules')
        .insert([{
          ...data,
          business_id: user?.id
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Éxito",
        description: "Horario asignado correctamente",
      });
      
      setAddScheduleOpen(false);
      scheduleForm.reset();
      fetchSchedules();
    } catch (error) {
      console.error('Error adding schedule:', error);
      toast({
        title: "Error",
        description: "No se pudo asignar el horario",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const { error } = await supabase
        .from('employee_schedules')
        .delete()
        .eq('id', scheduleId)
        .eq('business_id', user?.id);
      
      if (error) throw error;
      
      toast({
        title: "Éxito",
        description: "Horario eliminado correctamente",
      });
      
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el horario",
        variant: "destructive",
      });
    }
  };

  const getEmployeeSchedules = (employeeId) => {
    return schedules.filter(schedule => schedule.employees.id === employeeId);
  };

  const getSchedulesByDay = (day) => {
    return schedules.filter(schedule => schedule.day_of_week === day);
  };

  const getScheduleByEmployeeAndDay = (employeeId, day) => {
    return schedules.find(schedule => 
      schedule.employees.id === employeeId && 
      schedule.day_of_week === day
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Empleados</h1>
            <p className="text-muted-foreground">Gestiona tu equipo y horarios de trabajo</p>
          </div>
          <Button onClick={() => setAddEmployeeOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo empleado
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar empleados..." className="pl-8" />
          </div>
        </div>

        <Tabs defaultValue="listado">
          <TabsList className="mb-4">
            <TabsTrigger value="listado">Listado de empleados</TabsTrigger>
            <TabsTrigger value="horarios">Horarios semanales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listado" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex justify-center py-8">
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                </div>
              ) : employees.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <UserPlus className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No hay empleados registrados</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Agrega nuevos empleados para comenzar a gestionar tu equipo
                    </p>
                    <Button onClick={() => setAddEmployeeOpen(true)}>
                      Agregar empleado
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                employees.map(employee => (
                  <Card key={employee.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                            <span className="text-xl font-semibold">
                              {employee.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{employee.position}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {employee.email && (
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground w-20">Email:</span>
                            <span>{employee.email}</span>
                          </div>
                        )}
                        {employee.phone && (
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground w-20">Teléfono:</span>
                            <span>{employee.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground w-20">Estado:</span>
                          <Badge variant={employee.active ? "default" : "outline"}>
                            {employee.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">Horarios asignados</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setAddScheduleOpen(true);
                            }}
                          >
                            <PlusCircle className="h-3.5 w-3.5 mr-1" />
                            Asignar
                          </Button>
                        </div>
                        
                        {getEmployeeSchedules(employee.id).length > 0 ? (
                          <div className="space-y-1.5">
                            {getEmployeeSchedules(employee.id).map(schedule => (
                              <div key={schedule.id} className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{weekDays.find(d => d.value === schedule.day_of_week)?.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{schedule.shifts.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Sin horarios asignados
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="horarios">
            <Card>
              <CardHeader className="px-2 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Grilla semanal</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditScheduleMode(!editScheduleMode)}
                    >
                      {editScheduleMode ? "Finalizar edición" : "Editar horarios"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Empleado</TableHead>
                      {weekDays.map(day => (
                        <TableHead key={day.value} className="text-center">
                          {isMobile ? day.shortLabel : day.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map(employee => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{employee.name}</span>
                            <span className="text-xs text-muted-foreground">{employee.position}</span>
                          </div>
                        </TableCell>
                        {weekDays.map(day => {
                          const schedule = getScheduleByEmployeeAndDay(employee.id, day.value);
                          return (
                            <TableCell key={day.value} className="text-center p-1">
                              {schedule ? (
                                <div className="relative bg-muted/50 rounded-md p-2">
                                  <div className="font-medium">{schedule.shifts.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {schedule.shifts.start_time.substring(0, 5)} - {schedule.shifts.end_time.substring(0, 5)}
                                  </div>
                                  {editScheduleMode && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() => handleDeleteSchedule(schedule.id)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  {editScheduleMode ? (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 rounded-full"
                                      onClick={() => {
                                        setSelectedEmployee(employee);
                                        scheduleForm.setValue("day_of_week", day.value.toString());
                                        setAddScheduleOpen(true);
                                      }}
                                    >
                                      <PlusCircle className="h-4 w-4" />
                                    </Button>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">—</span>
                                  )}
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modal para agregar empleado */}
      <Dialog open={addEmployeeOpen} onOpenChange={setAddEmployeeOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agregar nuevo empleado</DialogTitle>
            <DialogDescription>
              Completa los datos del nuevo integrante de tu equipo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puesto</FormLabel>
                    <FormControl>
                      <Input placeholder="Mozo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="juan@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+54 11 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setAddEmployeeOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Modal para asignar horario */}
      <Dialog open={addScheduleOpen} onOpenChange={setAddScheduleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Asignar horario</DialogTitle>
            <DialogDescription>
              {selectedEmployee ? `Asignar horario para ${selectedEmployee.name}` : 'Selecciona empleado, día y turno'}
            </DialogDescription>
          </DialogHeader>
          <Form {...scheduleForm}>
            <form onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)} className="space-y-4 pt-2">
              {!selectedEmployee && (
                <FormField
                  control={scheduleForm.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empleado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar empleado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map(employee => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={scheduleForm.control}
                name="day_of_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día de la semana</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar día" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {weekDays.map(day => (
                          <SelectItem key={day.value} value={day.value.toString()}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="shift_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turno</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar turno" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shifts.map(shift => (
                          <SelectItem key={shift.id} value={shift.id}>
                            {shift.name} ({shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  setAddScheduleOpen(false);
                  setSelectedEmployee(null);
                }}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Employees;
