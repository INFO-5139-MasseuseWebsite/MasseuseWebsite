import Footer from "./components/Footer";
import Header from "./components/Header";

export default function NotFound404() {
    return <div style={{ minHeight: '100vh', display: "flex", flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
        <Header />
        <div style={{ flexGrow: 1 }} />
        <h1 style={{textAlign:'center'}}>404 Not Found</h1>
        <div style={{ flexGrow: 1 }} />
        <Footer />
    </div>
}