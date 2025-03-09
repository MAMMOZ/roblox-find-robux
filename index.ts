import fetch from "node-fetch";

const webhookUrl = `https://discord.com/api/webhooks/1308850149480730684/pZ0lqhFMAKi6P0-YmwowGySs1uG-0xB-dSshyzRBoTzAGzhWDShf_QentccGc0wkhMEt`;
const threadCount = 10; // ตั้งค่าเป็น 10 threads

console.log(`
____ _    ____ _  _ ____    ____ ____ ____ _  _ ___  
|__| |    |___ |_/  [__     | __ |__/ |  | |  | |__] 
|  | |___ |___ | \\_ ___]    |__] |  \\ |__| |__| |    
                                                     
____ _ _  _ ___  ____ ____ 
|___ | |\\ | |  \\ |___ |__/ 
|    | | \\| |__/ |___ |  \\ 
                           
`);

async function groupFinder() {
  while (true) {  // ทำให้ลูปทำงานตลอดไป
    try {
      const id = Math.floor(Math.random() * (15000000 - 1000000 + 1)) + 1000000;
      const r = await fetch(`https://www.roblox.com/groups/group.aspx?gid=${id}`);
      const text = await r.text();

      if (!text.includes("owned")) {
        const re = await fetch(`https://groups.roblox.com/v1/groups/${id}`);
        if (re.status !== 429) {
          const json = await re.json();
          if (!json.errors && !text.includes("isLocked") && text.includes("owner")) {
            if (json.publicEntryAllowed && json.owner === null) {
              await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: `Hit: https://www.roblox.com/groups/group.aspx?gid=${id}` }),
              });
              console.log(`[+] Hit: ${id}`);
            } else {
              console.log(`[-] No Entry Allowed: ${id}`);
            }
          } else {
            console.log(`[-] Group Locked: ${id}`);
          }
        } else {
          console.log("[-] Group API Rate Limited");
          await new Promise(resolve => setTimeout(resolve, 5000)); // รอ 5 วิ หากโดน rate limit
        }
      } else {
        console.log(`[-] Group Already Owned: ${id}`);
      }
    } catch (error) {
      console.error("[-] Error:", error);
    }
  }
}

// สร้าง 10 Threads พร้อมกัน
for (let i = 0; i < threadCount; i++) {
  groupFinder();
}
