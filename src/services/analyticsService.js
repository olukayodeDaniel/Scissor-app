import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import db from '../firebaseConfig';

// Fetch analytics data for a specific link and period
export async function fetchAnalyticsData(shortLink, period) {
  try {
    const analyticsCollection = collection(db, 'analytics');
    const q = query(analyticsCollection, where('shortLink', '==', shortLink));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach(doc => {
      const docData = doc.data();
      data.push({
        date: docData.date.toDate().toISOString().split('T')[0],
        clicks: Math.floor(docData.clicks)
      });
    });

    return aggregateData(data, period);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
}

// Aggregate data by period (hourly, daily, monthly)
function aggregateData(data, period) {
  const aggregatedData = {};

  data.forEach(item => {
    const key = getPeriodKey(item.date, period);
    if (!aggregatedData[key]) {
      aggregatedData[key] = 0;
    }
    aggregatedData[key] += Math.floor(item.clicks);
  });

  return Object.keys(aggregatedData).map(date => ({
    date,
    clicks: aggregatedData[date],
  }));
}

// Get key for aggregation
function getPeriodKey(date, period) {
  const dateObj = new Date(date);
  switch (period) {
    case 'hourly':
      return dateObj.toISOString().split('T')[1].split(':')[0];
    case 'daily':
      return dateObj.toISOString().split('T')[0];
    case 'monthly':
      return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
    default:
      return dateObj.toISOString().split('T')[0];
  }
}

// Add analytics data to Firestore
export async function addAnalyticsData(shortLink) {
  try {
    const analyticsCollection = collection(db, 'analytics');
    const now = Timestamp.now();

    await addDoc(analyticsCollection, {
      shortLink,
      clicks: 0,
      date: now,
    });
  } catch (error) {
    console.error('Error adding analytics data:', error);
    throw error;
  }
}
