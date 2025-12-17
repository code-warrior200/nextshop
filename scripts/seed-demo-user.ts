// Demo user seeding script
// Run this in browser console or add to app initialization

export const seedDemoUser = () => {
  const demoUser = {
    id: "demo-001",
    email: "demo@niceshop.com",
    password: "demo123",
    name: "Demo User",
    createdAt: new Date().toISOString(),
  };

  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  
  if (!users.find((u: any) => u.email === demoUser.email)) {
    users.push(demoUser);
    localStorage.setItem('mock-users', JSON.stringify(users));
    console.log('✅ Demo user created successfully');
    console.log('Email: demo@niceshop.com');
    console.log('Password: demo123');
  } else {
    console.log('ℹ️ Demo user already exists');
  }
};

// Auto-seed demo user
if (typeof window !== 'undefined') {
  seedDemoUser();
}

