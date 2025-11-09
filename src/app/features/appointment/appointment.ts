import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  availableTime: string;
  price: number;
  gender: 'Male' | 'Female';
  image: string;
  experience?: string;
  patients?: string;
  reviews?: number;
  aboutMe?: string;
  location?: string;
}


@Component({
  selector: 'app-appointment',
  imports: [RouterLink],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss',
})

export class Appointment {


  doctorId: number | null = null;

  selectedDoctor: Doctor | undefined ;

  constructor(private route: ActivatedRoute) { }

  days = [
  { name: 'Fri', date: 12 },
  { name: 'Sat', date: 13 },
  { name: 'Sun', date: 14 },
  { name: 'Mon', date: 15 },
  { name: 'Tue', date: 16 },
  { name: 'Wed', date: 17 },
  { name: 'Thu', date: 18 },
  ];

  times = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:30 PM',
  '5:30 PM',
  '7:00 PM',
  '9:00 PM',
  '10:00 PM',
];

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorDetails(this.doctorId);
      }
    });
  }


  private loadDoctorDetails(id: number): void {
    const allDoctors = this.getMockDoctors();
    this.selectedDoctor = allDoctors.find(doc => doc.id === id);
  }



  private getMockDoctors(): Doctor[] {
    return [

      {
        id: 1, name: 'Robert Johnson', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.8, availableTime: '9:00am - 8:00pm', price: 350, gender: 'Male', image: 'assets/images/doctor-1.svg',
        experience: '10+ years', patients: '2,000+', reviews: 1872,
        aboutMe: 'Dr. Robert Johnson is a board-certified Orthopedic Surgeon with extensive experience in joint replacements and sports injuries. He is dedicated to providing personalized care and helping patients regain mobility.',
        location: '129, El-Nasr Street, Cairo, Egypt'
      },
      {
        id: 2, name: 'Alice Smith', specialty: 'Cardiologist', hospital: 'City General', rating: 4.9, availableTime: '10:00am - 7:00pm', price: 400, gender: 'Female', image: 'assets/images/doctor-2.svg',
        experience: '12+ years', patients: '2,500+', reviews: 2100,
        aboutMe: 'Dr. Alice Smith is a leading Cardiologist dedicated to heart health and preventative care. She focuses on accurate diagnosis and effective treatment plans for cardiovascular conditions.',
        location: '101, Heartbeat Lane, Downtown, Egypt'
      },
      {
        id: 3, name: 'Emily White', specialty: 'Pediatrician', hospital: 'Children\'s Hospital', rating: 4.7, availableTime: '8:00am - 5:00pm', price: 300, gender: 'Female', image: 'assets/images/doctor-3.svg',
        experience: '7+ years', patients: '1,800+', reviews: 1500,
        aboutMe: 'Dr. Emily White is a compassionate Pediatrician committed to the health and well-being of children from infancy through adolescence. She provides comprehensive care in a friendly environment.',
        location: '789, Kid\'s Health Road, New Cairo, Egypt'
      },
      {
        id: 4, name: 'Michael Brown', specialty: 'Dentist', hospital: 'Dental Clinic', rating: 4.5, availableTime: '9:00am - 6:00pm', price: 250, gender: 'Male', image: 'assets/images/doctor-4.svg',
        experience: '9+ years', patients: '1,200+', reviews: 950,
        aboutMe: 'Dr. Michael Brown is a skilled Dentist offering a wide range of dental services, from routine check-ups to cosmetic procedures. He emphasizes patient comfort and clear communication.',
        location: '456, Smile Street, Heliopolis, Egypt'
      },
      {
        id: 5, name: 'Sarah Davis', specialty: 'Neurologist', hospital: 'St. Jude Medical', rating: 4.9, availableTime: '11:00am - 8:00pm', price: 450, gender: 'Female', image: 'assets/images/doctor-5.svg',
        experience: '15+ years', patients: '3,000+', reviews: 2800,
        aboutMe: 'Dr. Sarah Davis is an experienced Neurologist specializing in brain and nervous system disorders. She provides expert diagnosis and advanced treatment options for complex neurological conditions.',
        location: '123, Brain Path, Nasr City, Egypt'
      },
      {
        id: 6, name: 'David Lee', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.6, availableTime: '9:00am - 7:00pm', price: 370, gender: 'Male', image: 'assets/images/doctor-6.svg',
        experience: '8+ years', patients: '1,900+', reviews: 1600,
        aboutMe: 'Dr. David Lee is an Orthopedic specialist focusing on musculoskeletal health and sports medicine. He helps patients recover from injuries and improve their overall physical function.',
        location: '129, El-Nasr Street, Cairo, Egypt'
      },
      {
        id: 7, name: 'Jessica Chen', specialty: 'Cardiologist', hospital: 'Heart Institute', rating: 4.8, availableTime: '8:30am - 5:30pm', price: 420, gender: 'Female', image: 'assets/images/doctor-7.svg',
        experience: '11+ years', patients: '2,200+', reviews: 1900,
        aboutMe: 'Dr. Jessica Chen is a dedicated Cardiologist with a passion for helping patients maintain a healthy heart. She employs the latest diagnostic tools and treatment protocols.',
        location: '88, Heart Health Ave, Maadi, Egypt'
      },
      {
        id: 8, name: 'Kevin Wang', specialty: 'Dentist', hospital: 'Happy Teeth Clinic', rating: 4.7, availableTime: '10:00am - 7:00pm', price: 280, gender: 'Male', image: 'assets/images/doctor-8.svg',
        experience: '6+ years', patients: '1,000+', reviews: 800,
        aboutMe: 'Dr. Kevin Wang provides gentle and effective dental care, ensuring his patients have healthy and beautiful smiles. He is committed to ongoing education and patient comfort.',
        location: '55, Tooth Fairy Lane, Sheikh Zayed, Egypt'
      },
      {
        id: 9, name: 'Olivia Kim', specialty: 'Pulmonologist', hospital: 'Lung Health Center', rating: 4.9, availableTime: '9:00am - 6:00pm', price: 380, gender: 'Female', image: 'assets/images/doctor-9.svg',
        experience: '8+ years', patients: '1,500+', reviews: 1200,
        aboutMe: 'Dr. Olivia Kim is a dedicated Pulmonologist specializing in respiratory conditions and lung health. She offers comprehensive care for various lung diseases and breathing disorders.',
        location: '456, Medical Avenue, Giza, Egypt'
      },
    ];
  }


}
