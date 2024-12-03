import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entity/contact-info.entity';
import { Employee } from './entity/employee.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async seed() {
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'email@email.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    const manager = this.employeeRepo.create({
      name: 'Marius',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'Hire people' });
    await this.taskRepo.save(task1);

    const task2 = this.taskRepo.create({ name: 'Present to CEO' });
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepo.save(manager);

    return 'Hello World!';
  }
}
