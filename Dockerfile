# ใช้ Official Bun Docker image
FROM oven/bun:latest

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดเข้าไปใน container
COPY . .

# ติดตั้ง dependencies (ถ้ามี)
RUN bun install

# รันโปรแกรม
CMD ["bun", "index.ts"]
