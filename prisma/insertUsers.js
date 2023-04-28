import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();
	const users = [
		{
			email: 'john@example.com',
			firstName: 'John',
			lastName: 'Doe',
			phone: '+1-555-555-1234',
			totalRevenue: 1000.0,
			userApproved: true
		},
		{
			email: 'jane@example.com',
			firstName: 'Jane',
			lastName: 'Doe',
			phone: '+1-555-555-5678',
			totalRevenue: 5000.0,
			userApproved: true
		},
		{
			email: 'alex@example.com',
			firstName: 'Alex',
			lastName: 'Smith',
			phone: '+1-555-555-9123',
			totalRevenue: 2000.0,
			userApproved: false
		},
		{
			email: 'sara@example.com',
			firstName: 'Sara',
			lastName: 'Johnson',
			phone: '+1-555-555-4567',
			totalRevenue: 0.0,
			userApproved: true
		},
		{
			email: 'bob@example.com',
			firstName: 'Bob',
			lastName: 'Anderson',
			phone: '+1-555-555-8901',
			totalRevenue: 10000.0,
			userApproved: true
		},
		{
			email: 'jim@example.com',
			firstName: 'Jim',
			lastName: 'Brown',
			phone: '+1-555-555-2345',
			totalRevenue: 500.0,
			userApproved: true
		},
		{
			email: 'emily@example.com',
			firstName: 'Emily',
			lastName: 'Wilson',
			phone: '+1-555-555-6789',
			totalRevenue: 0.0,
			userApproved: true
		},
		{
			email: 'mike@example.com',
			firstName: 'Mike',
			lastName: 'Taylor',
			phone: '+1-555-555-1234',
			totalRevenue: 3000.0,
			userApproved: false
		},
		{
			email: 'sam@example.com',
			firstName: 'Sam',
			lastName: 'Martinez',
			phone: '+1-555-555-5678',
			totalRevenue: 7000.0,
			userApproved: true
		},
		{
			email: 'anna@example.com',
			firstName: 'Anna',
			lastName: 'Lee',
			phone: '+1-555-555-9123',
			totalRevenue: 1500.0,
			userApproved: true
		},
		{
			email: 'megan@example.com',
			firstName: 'Megan',
			lastName: 'Johnson',
			phone: '+1-555-555-1234',
			totalRevenue: 4500.0,
			userApproved: true
		},
		{
			email: 'david@example.com',
			firstName: 'David',
			lastName: 'Garcia',
			phone: '+1-555-555-5678',
			totalRevenue: 8000.0,
			userApproved: false
		},
		{
			email: 'jessica@example.com',
			firstName: 'Jessica',
			lastName: 'Davis',
			phone: '+1-555-555-9123',
			totalRevenue: 2500.0,
			userApproved: true
		},
		{
			email: 'kevin@example.com',
			firstName: 'Kevin',
			lastName: 'Jones',
			phone: '+1-555-555-4567',
			totalRevenue: 0.0,
			userApproved: true
		},
		{
			email: 'samantha@example.com',
			firstName: 'Samantha',
			lastName: 'Wilson',
			phone: '+1-555-555-8901',
			totalRevenue: 6000.0,
			userApproved: true
		},
		{
			email: 'steven@example.com',
			firstName: 'Steven',
			lastName: 'Anderson',
			phone: '+1-555-555-2345',
			totalRevenue: 3500.0,
			userApproved: true
		},
		{
			email: 'laura@example.com',
			firstName: 'Laura',
			lastName: 'Taylor',
			phone: '+1-555-555-6789',
			totalRevenue: 1000.0,
			userApproved: false
		},
		{
			email: 'eric@example.com',
			firstName: 'Eric',
			lastName: 'Martin',
			phone: '+1-555-555-1234',
			totalRevenue: 12000.0,
			userApproved: true
		},
		{
			email: 'michelle@example.com',
			firstName: 'Michelle',
			lastName: 'Lee',
			phone: '+1-555-555-5678',
			totalRevenue: 500.0,
			userApproved: true
		},
		{
			email: 'ryan@example.com',
			firstName: 'Ryan',
			lastName: 'Harris',
			phone: '+1-555-555-9123',
			totalRevenue: 0.0,
			userApproved: true
		},
		{
			email: 'julie@example.com',
			firstName: 'Julie',
			lastName: 'Jackson',
			phone: '+1-555-555-4567',
			totalRevenue: 2000.0,
			userApproved: true
		},
		{
			email: 'patrick@example.com',
			firstName: 'Patrick',
			lastName: 'Brown',
			phone: '+1-555-555-8901',
			totalRevenue: 900.0,
			userApproved: false
		},
		{
			email: 'danielle@example.com',
			firstName: 'Danielle',
			lastName: 'Clark',
			phone: '+1-555-555-2345',
			totalRevenue: 7500.0,
			userApproved: true
		},
		{
			email: 'jason@example.com',
			firstName: 'Jason',
			lastName: 'Ramirez',
			phone: '+1-555-555-6789',
			totalRevenue: 100
		},
		{
			email: 'cynthia@example.com',
			firstName: 'Cynthia',
			lastName: 'Anderson',
			phone: '+1-555-555-1234',
			totalRevenue: 4000.0,
			userApproved: true
		},
		{
			email: 'greg@example.com',
			firstName: 'Greg',
			lastName: 'Mitchell',
			phone: '+1-555-555-5678',
			totalRevenue: 1500.0,
			userApproved: true
		},
		{
			email: 'kimberly@example.com',
			firstName: 'Kimberly',
			lastName: 'Perez',
			phone: '+1-555-555-9123',
			totalRevenue: 6500.0,
			userApproved: false
		},
		{
			email: 'trevor@example.com',
			firstName: 'Trevor',
			lastName: 'Robinson',
			phone: '+1-555-555-4567',
			totalRevenue: 0.0,
			userApproved: true
		},
		{
			email: 'sabrina@example.com',
			firstName: 'Sabrina',
			lastName: 'Gonzalez',
			phone: '+1-555-555-8901',
			totalRevenue: 200.0,
			userApproved: true
		},
		{
			email: 'derek@example.com',
			firstName: 'Derek',
			lastName: 'Baker',
			phone: '+1-555-555-2345',
			totalRevenue: 1800.0,
			userApproved: true
		}
	];

	for (const user of users) {
		const createdUser = await prisma.user.create({ data: user });
		await prisma.userRole.create({
			data: {
				role: 'user',
				userId: createdUser.id
			}
		});
	}

	console.log('Sample users created successfully');
}

main()
	.catch((e) => console.error(e))
	.finally(() => prisma.$disconnect());
