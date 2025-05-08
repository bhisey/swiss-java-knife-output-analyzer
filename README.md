# Swiss Java Knife Output Analyzer: Interactive nodetool sjk Thread Dump and Performance Visualizer

The Swiss Java Knife Output Analyzer is an interactive web tool designed to visualize and analyze JVM thread dump and performance output specifically generated from the Cassandra nodetool sjk ttop command. The tool is built to help support teams quickly identify which threads are consuming the most CPU or memory, making it easier to detect bottlenecks and performance issues within Cassandra clusters.

The tool efficiently processes JVM thread dump outputs (including .output, .log, and .txt files) captured using nodetool sjk ttop. It provides synchronized, zoomable charts that display application-level metrics, such as CPU usage and heap allocation, as well as detailed, sortable tables presenting per-thread statistics. This intuitive visualization makes it significantly easier to pinpoint resource-hungry threads, facilitating more efficient troubleshooting and performance optimization in large, distributed Cassandra environments.

 ---

## 🚀 **Quick Summary**
Swiss Java Knife Output Analyzer: Interactive sjk Thread Visualizer is a powerful, user-friendly web app for JVM thread dump analysis. It visualizes CPU and heap allocation trends, lets you zoom and filter by time, and provides sortable, paginated thread details—making JVM troubleshooting fast and intuitive.

---

## 📸 **Snapshot Example**
<!-- Add a screenshot of the tool UI here -->
![Snapshot Placeholder](./docs/snapshot-placeholder.png)

---

## 🛠️ **How to Use (First Time Setup)**
1. **Clone the repository:**
   ```sh
   git clone swiss-java-knife-output-analyzer
   cd swiss-java-knife-output-analyzer

   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Add the DataStax Support logo:**
   - Place your logo image as `public/datastax-support-logo.png` (PNG format).
4. **Start the development server:**
   ```sh
   npm start
   ```
5. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
6. **Upload a JVM thread dump file:**
   - Supported formats: `.txt`, `.log`, `.out`, `.output`
   - Drag and drop or click to select your file.
7. **Explore the visualizations:**
   - Zoom and pan on the CPU and Heap Allocation charts (they stay in sync).
   - The Thread Details table updates to show all threads in the selected time range, with sortable columns and pagination.
   - Toggle dark/light mode for your preferred viewing experience.

---

## 🧑‍💻 **Technologies Used**
- **React** (18.x)
- **TypeScript** (4.x)
- **Tailwind CSS** (3.x)
- **Recharts** (2.x)
- **react-dropzone** (14.x)
- **Create React App** (5.x)

### **Supported Node/NPM Versions**
- Node.js: >= 16.x
- npm: >= 8.x

---

## 📂 **Features**
- Upload JVM thread dump files (`.txt`, `.log`, `.out`, `.output`)
- Parse and visualize CPU usage and heap allocation rate over time
- Synchronized, zoomable charts for CPU and heap allocation
- Thread table with sortable columns, timestamp, and pagination
- Dark mode toggle

---

## 📝 **Usage Notes**
- For best results, use JVM thread dump files in the format shown in the sample logs.
- The tool is designed for JVM thread monitoring outputs with per-thread CPU and allocation stats.
- Large files are supported and paginated for performance.

```
2023-12-27T23:05:10.547+0000 Process summary
  process cpu=166.23%
  application cpu=163.80% (user=109.99% sys=53.81%)
  other: cpu=2.44%
  thread count: 150
  heap allocation rate 64mb/s
[000027] user= 6.55% sys=29.42% alloc=  1423b/s - ParkedThreadsMonitor
[000050] user=15.80% sys= 2.10% alloc=   11mb/s - CoreThread-2
[000048] user=10.02% sys= 1.42% alloc= 2361kb/s - CoreThread-0
[000052] user= 9.05% sys= 1.13% alloc= 9522kb/s - CoreThread-4
[000049] user= 9.05% sys= 1.04% alloc= 1712kb/s - CoreThread-1
[000058] user= 5.59% sys= 2.00% alloc= 5802kb/s - CoreThread-10
[000055] user= 5.97% sys= 1.38% alloc= 3366kb/s - CoreThread-7
[000062] user= 5.78% sys= 1.48% alloc= 5604kb/s - CoreThread-14
[000057] user= 5.97% sys= 1.17% alloc= 6218kb/s - CoreThread-9
[000051] user= 5.20% sys= 1.67% alloc= 1380kb/s - CoreThread-3
[000059] user= 4.24% sys= 1.05% alloc= 1343kb/s - CoreThread-11
[000060] user= 3.47% sys= 1.73% alloc= 1235kb/s - CoreThread-12
[000054] user= 3.85% sys= 1.29% alloc= 1202kb/s - CoreThread-6
[000053] user= 3.47% sys= 1.14% alloc=  627kb/s - CoreThread-5
[000056] user= 2.89% sys= 1.53% alloc=  928kb/s - CoreThread-8
[000061] user= 3.08% sys= 1.30% alloc=  717kb/s - CoreThread-13
[000885] user= 4.24% sys= 0.04% alloc= 6659kb/s - NodeSync-1
[006087] user= 1.93% sys= 0.71% alloc= 2524kb/s - RMI TCP Connection(241)-127.0.0.1
[006288] user= 1.16% sys= 0.69% alloc= 1428kb/s - RMI TCP Connection(245)-127.0.0.1
[000372] user= 0.58% sys= 0.60% alloc=   38kb/s - ChunkCacheCleanup:1
[001209] user= 0.19% sys= 0.24% alloc=  117kb/s - mainIOThread-245
[001159] user= 0.00% sys= 0.27% alloc=   93kb/s - mainIOThread-200
[000028] user= 0.19% sys= 0.06% alloc=  224kb/s - ScheduledTasks:1
```

Output
<img width="1193" alt="image" src="https://github.com/user-attachments/assets/5819a121-9ce0-4e26-8ea5-64e533dda234" />


