FROM debian:12.11-slim

COPY bin/buildi /root/bin/buildi
COPY database-seed.json /root/database-seed.json
RUN chmod +x /root/bin/buildi && \
    /root/bin/buildi

WORKDIR /root
