module.exports = {
    apps : [{
        name: "aws-rds-demo",
        script: "npm",
        args: "start",
        env: {
            NODE_ENV: "production",
            PORT: 1212
        },
        watch: false,
        exec_mode: "fork",
        instances: 1, // CPU 코어 수만큼 인스턴스를 실행하려면 'max'를 사용하십시오.
        autorestart: true,
        max_memory_restart: "1G"
    }]
}
