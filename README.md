# Cassandra sjk output Analyzer: Interactive sjk Thread Visualizer

Cassandra sjk output Analyzer: Interactive sjk Thread Visualizer is a modern, interactive web tool for visualizing and analyzing JVM thread dump and performance logs. It helps engineers and support teams quickly identify CPU and memory allocation anomalies, thread-level bottlenecks, and performance trends in large Java applications. The tool is designed for JVM thread dump outputs (including `.txt`, `.log`, `.out`, and `.output` files) and provides synchronized, zoomable charts and sortable, paginated thread tables for deep analysis.

---

## 🚀 **Quick Summary**
Cassandra sjk output Analyzer: Interactive sjk Thread Visualizer is a powerful, user-friendly web app for JVM thread dump analysis. It visualizes CPU and heap allocation trends, lets you zoom and filter by time, and provides sortable, paginated thread details—making JVM troubleshooting fast and intuitive.

---

## 📸 **Snapshot Example**
<!-- Add a screenshot of the tool UI here -->
![Snapshot Placeholder](./docs/snapshot-placeholder.png)

---

## 🛠️ **How to Use (First Time Setup)**
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd jvm-thread-visualizer
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
- DataStax Support branding

---

## 📝 **Usage Notes**
- For best results, use JVM thread dump files in the format shown in the sample logs.
- The tool is designed for JVM thread monitoring outputs with per-thread CPU and allocation stats.
- Large files are supported and paginated for performance.

---

## 📸 **Add Your Snapshot Here**
<!-- Replace the placeholder above with a real screenshot after your first run! -->

---

## 🤝 **Contributing**
Pull requests and suggestions are welcome! Please open an issue or PR for improvements.

---

## 📄 **License**
MIT License 